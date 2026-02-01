"""
Backend API Tests for A&O Ecosystem - Login and Dashboard Features
Tests: Login, Inverfact Dashboard, NomadHive Dashboard, Admin Dashboard
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test credentials
TEST_EMAIL = "jaimesblandon.adrianfelipe@gmail.com"
TEST_PASSWORD = "Fagipitu2430*"

class TestAuthLogin:
    """Test login functionality"""
    
    def test_login_success(self):
        """Test successful login with valid credentials"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": TEST_EMAIL, "password": TEST_PASSWORD}
        )
        assert response.status_code == 200, f"Login failed: {response.text}"
        
        data = response.json()
        assert "user_id" in data
        assert "email" in data
        assert data["email"] == TEST_EMAIL
        assert "role" in data
        assert data["role"] == "super_admin"
        assert "session_token" in data
        print(f"✓ Login successful - User: {data['name']}, Role: {data['role']}")
        return data
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "wrong@email.com", "password": "wrongpassword"}
        )
        assert response.status_code == 401
        print("✓ Invalid credentials correctly rejected")
    
    def test_login_missing_fields(self):
        """Test login with missing fields"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": TEST_EMAIL}
        )
        assert response.status_code == 422  # Validation error
        print("✓ Missing fields correctly rejected")


class TestAuthenticatedEndpoints:
    """Test authenticated endpoints with session token"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Login and get session token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": TEST_EMAIL, "password": TEST_PASSWORD}
        )
        assert response.status_code == 200
        self.session_token = response.json()["session_token"]
        self.cookies = {"session_token": self.session_token}
        self.user_data = response.json()
    
    def test_get_current_user(self):
        """Test /api/auth/me endpoint"""
        response = requests.get(
            f"{BASE_URL}/api/auth/me",
            cookies=self.cookies
        )
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == TEST_EMAIL
        assert data["role"] == "super_admin"
        print(f"✓ Auth/me working - User: {data['name']}")


class TestInverfactDashboard:
    """Test Inverfact Dashboard API endpoints"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Login and get session token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": TEST_EMAIL, "password": TEST_PASSWORD}
        )
        assert response.status_code == 200
        self.session_token = response.json()["session_token"]
        self.cookies = {"session_token": self.session_token}
        self.user_id = response.json()["user_id"]
    
    def test_get_inverfact_strategies(self):
        """Test getting all available Inverfact strategies"""
        response = requests.get(f"{BASE_URL}/api/inverfact/strategies")
        assert response.status_code == 200
        data = response.json()
        assert "strategies" in data
        assert len(data["strategies"]) > 0
        print(f"✓ Inverfact strategies: {len(data['strategies'])} available")
        for s in data["strategies"]:
            print(f"  - {s['name']} ({s['category']})")
    
    def test_get_user_inverfact_strategies(self):
        """Test getting user's activated strategies"""
        response = requests.get(
            f"{BASE_URL}/api/inverfact/user/strategies",
            cookies=self.cookies
        )
        assert response.status_code == 200
        data = response.json()
        assert "strategies" in data
        assert "has_active_strategies" in data
        print(f"✓ User strategies: {data['count']} active, has_active: {data['has_active_strategies']}")
        if data["strategies"]:
            for s in data["strategies"]:
                print(f"  - {s['name']}")
    
    def test_get_admin_users_strategies(self):
        """Test admin endpoint to get all users with strategies"""
        response = requests.get(
            f"{BASE_URL}/api/inverfact/admin/users-strategies",
            cookies=self.cookies
        )
        assert response.status_code == 200
        data = response.json()
        assert "users" in data
        print(f"✓ Admin users-strategies: {len(data['users'])} users")
    
    def test_inverfact_contact_form(self):
        """Test Inverfact contact form submission"""
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+57 300 123 4567",
            "message": "Test message for Inverfact",
            "interested_strategy": "gt_kwnex"
        }
        response = requests.post(
            f"{BASE_URL}/api/inverfact/contact",
            json=contact_data
        )
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "success"
        print(f"✓ Contact form submitted: {data['message']}")


class TestNomadHiveDashboard:
    """Test NomadHive Dashboard API endpoints"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Login and get session token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": TEST_EMAIL, "password": TEST_PASSWORD}
        )
        assert response.status_code == 200
        self.session_token = response.json()["session_token"]
        self.cookies = {"session_token": self.session_token}
    
    def test_get_nomadhive_profile(self):
        """Test getting NomadHive impulsador profile"""
        response = requests.get(
            f"{BASE_URL}/api/nomadhive/profile",
            cookies=self.cookies
        )
        assert response.status_code == 200
        data = response.json()
        assert "user_id" in data
        assert "referral_code" in data
        assert "total_points" in data
        assert "level" in data
        print(f"✓ NomadHive profile: Level={data['level']}, Points={data['total_points']}, Code={data['referral_code']}")
    
    def test_get_nomadhive_tasks(self):
        """Test getting available tasks"""
        response = requests.get(
            f"{BASE_URL}/api/nomadhive/tasks",
            cookies=self.cookies
        )
        assert response.status_code == 200
        data = response.json()
        assert "tasks" in data
        assert "completed_count" in data
        assert "total_count" in data
        print(f"✓ NomadHive tasks: {data['completed_count']}/{data['total_count']} completed")
    
    def test_get_nomadhive_rewards(self):
        """Test getting available rewards"""
        response = requests.get(
            f"{BASE_URL}/api/nomadhive/rewards",
            cookies=self.cookies
        )
        assert response.status_code == 200
        data = response.json()
        assert "rewards" in data
        assert "current_points" in data
        print(f"✓ NomadHive rewards: {len(data['rewards'])} available, Current points: {data['current_points']}")
    
    def test_get_nomadhive_orders(self):
        """Test getting impulsador orders"""
        response = requests.get(
            f"{BASE_URL}/api/nomadhive/orders",
            cookies=self.cookies
        )
        assert response.status_code == 200
        data = response.json()
        assert "orders" in data
        assert "count" in data
        print(f"✓ NomadHive orders: {data['count']} orders")
    
    def test_get_nomadhive_leaderboard(self):
        """Test getting leaderboard"""
        response = requests.get(
            f"{BASE_URL}/api/nomadhive/leaderboard",
            cookies=self.cookies
        )
        assert response.status_code == 200
        data = response.json()
        assert "leaderboard" in data
        print(f"✓ NomadHive leaderboard: {len(data['leaderboard'])} entries")


class TestAdminDashboard:
    """Test Admin Dashboard API endpoints"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Login and get session token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": TEST_EMAIL, "password": TEST_PASSWORD}
        )
        assert response.status_code == 200
        self.session_token = response.json()["session_token"]
        self.cookies = {"session_token": self.session_token}
    
    def test_get_dashboard_stats(self):
        """Test getting dashboard statistics"""
        response = requests.get(
            f"{BASE_URL}/api/stats/dashboard",
            cookies=self.cookies
        )
        assert response.status_code == 200
        data = response.json()
        assert "total_products" in data
        assert "total_orders" in data
        assert "total_users" in data
        assert "total_revenue" in data
        print(f"✓ Dashboard stats: Products={data['total_products']}, Orders={data['total_orders']}, Users={data['total_users']}, Revenue=${data['total_revenue']}")
    
    def test_get_products(self):
        """Test getting products list"""
        response = requests.get(
            f"{BASE_URL}/api/products",
            cookies=self.cookies
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Products: {len(data)} products")
    
    def test_get_users(self):
        """Test getting users list (admin only)"""
        response = requests.get(
            f"{BASE_URL}/api/users",
            cookies=self.cookies
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Users: {len(data)} users")
    
    def test_get_inverpulse_investors(self):
        """Test getting InverPulse investors list"""
        response = requests.get(
            f"{BASE_URL}/api/inverpulse/investors",
            cookies=self.cookies
        )
        assert response.status_code == 200
        data = response.json()
        assert "investors" in data
        assert "count" in data
        print(f"✓ InverPulse investors: {data['count']} investors")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
