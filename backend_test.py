import requests
import sys
import json
from datetime import datetime

class AOEcosistemaAPITester:
    def __init__(self, base_url="https://brandportal-9.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.session_token = None
        self.admin_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASSED" if success else "❌ FAILED"
        print(f"{status} - {name}")
        if details:
            print(f"   Details: {details}")

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if headers:
            test_headers.update(headers)
        
        if self.session_token:
            test_headers['Authorization'] = f'Bearer {self.session_token}'

        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers)

            success = response.status_code == expected_status
            details = f"Status: {response.status_code}"
            
            if success and response.content:
                try:
                    response_data = response.json()
                    details += f", Response: {json.dumps(response_data, indent=2)[:200]}..."
                    self.log_test(name, True, details)
                    return True, response_data
                except:
                    self.log_test(name, True, details)
                    return True, {}
            elif not success:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data}"
                except:
                    details += f", Raw response: {response.text[:200]}"
                self.log_test(name, False, details)
                return False, {}
            else:
                self.log_test(name, True, details)
                return True, {}

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return False, {}

    def test_admin_login(self):
        """Test admin login with provided credentials"""
        print("\n🔐 Testing Admin Authentication...")
        
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "auth/login",
            200,
            data={
                "email": "jaimesblandon.adrianfelipe@gmail.com",
                "password": "Fagipitu2430*"
            }
        )
        
        if success and 'session_token' in response:
            self.admin_token = response['session_token']
            self.session_token = response['session_token']
            return True
        return False

    def test_user_registration(self):
        """Test user registration"""
        print("\n👤 Testing User Registration...")
        
        test_user_email = f"test_user_{datetime.now().strftime('%H%M%S')}@test.com"
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "auth/register",
            200,
            data={
                "name": "Test User",
                "email": test_user_email,
                "password": "TestPass123!"
            }
        )
        
        return success, response

    def test_products_endpoints(self):
        """Test products CRUD operations"""
        print("\n📦 Testing Products Endpoints...")
        
        # Get all products
        success, products = self.run_test(
            "Get All Products",
            "GET",
            "products",
            200
        )
        
        if not success:
            return False
        
        # Get active products only
        success, active_products = self.run_test(
            "Get Active Products",
            "GET",
            "products?status=active",
            200
        )
        
        if not success:
            return False
        
        # Test getting a specific product if any exist
        if products and len(products) > 0:
            product_id = products[0]['product_id']
            success, product = self.run_test(
                "Get Single Product",
                "GET",
                f"products/{product_id}",
                200
            )
            
            if not success:
                return False
        
        # Test creating a product (requires admin auth)
        if self.admin_token:
            success, new_product = self.run_test(
                "Create Product (Admin)",
                "POST",
                "products",
                200,
                data={
                    "name": "Test Product API",
                    "description": "Product created via API test",
                    "price": 29.99,
                    "commission_rate": 15.0,
                    "category": "Test",
                    "image_url": "https://images.unsplash.com/photo-1647507653704-bde7f2d6dbf0?crop=entropy&cs=srgb&fm=jpg&q=85",
                    "stock": 100
                }
            )
            
            return success
        
        return True

    def test_orders_endpoints(self):
        """Test orders functionality"""
        print("\n🛒 Testing Orders Endpoints...")
        
        # Get user orders
        success, orders = self.run_test(
            "Get User Orders",
            "GET",
            "orders",
            200
        )
        
        return success

    def test_chat_endpoint(self):
        """Test LucidBot chat functionality"""
        print("\n🤖 Testing LucidBot Chat...")
        
        success, response = self.run_test(
            "LucidBot Chat",
            "POST",
            "chat",
            200,
            data={
                "message": "Hola, ¿qué productos tienen disponibles?",
                "session_id": None
            }
        )
        
        return success

    def test_dashboard_stats(self):
        """Test dashboard statistics"""
        print("\n📊 Testing Dashboard Stats...")
        
        success, stats = self.run_test(
            "Dashboard Statistics",
            "GET",
            "stats/dashboard",
            200
        )
        
        return success

    def test_users_management(self):
        """Test user management (admin only)"""
        print("\n👥 Testing User Management...")
        
        if not self.admin_token:
            print("⚠️  Skipping user management tests - no admin token")
            return True
        
        success, users = self.run_test(
            "Get All Users (Admin)",
            "GET",
            "users",
            200
        )
        
        return success

    def test_commissions_endpoint(self):
        """Test commissions endpoint"""
        print("\n💰 Testing Commissions...")
        
        success, commissions = self.run_test(
            "Get Commissions",
            "GET",
            "commissions",
            200
        )
        
        return success

    def test_auth_me_endpoint(self):
        """Test current user endpoint"""
        print("\n🔍 Testing Auth Me Endpoint...")
        
        success, user_data = self.run_test(
            "Get Current User",
            "GET",
            "auth/me",
            200
        )
        
        return success

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting A&O Ecosistema Backend API Tests")
        print(f"🌐 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Test admin authentication first
        if not self.test_admin_login():
            print("❌ Admin login failed - some tests will be skipped")
        
        # Test user registration
        self.test_user_registration()
        
        # Test authenticated endpoints
        self.test_auth_me_endpoint()
        self.test_products_endpoints()
        self.test_orders_endpoints()
        self.test_dashboard_stats()
        self.test_users_management()
        self.test_commissions_endpoint()
        
        # Test chat functionality
        self.test_chat_endpoint()
        
        # Print final results
        print("\n" + "=" * 60)
        print(f"📊 FINAL RESULTS: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return 1

def main():
    tester = AOEcosistemaAPITester()
    return tester.run_all_tests()

if __name__ == "__main__":
    sys.exit(main())