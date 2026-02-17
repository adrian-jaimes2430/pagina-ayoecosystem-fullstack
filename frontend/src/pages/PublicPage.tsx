import { useEffect, useState } from "react";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { builder } from "../builder";
import { useLocation, Navigate } from "react-router-dom";

interface BuilderPageData {
  data?: object;
}

export default function PublicPage() {
  const location = useLocation();
  const isPreviewing = useIsPreviewing();
  const [pageData, setPageData] = useState<BuilderPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPage() {
      try {
        const data = await builder
          .get("page", {
            userAttributes: {
              urlPath: location.pathname,
            },
          })
          .toPromise();

        if (data) {
          setPageData(data);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchPage();
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

    return <Navigate to="/login" replace />;
  }

  return <BuilderComponent model="page" content={pageData} />;
}
