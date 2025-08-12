import { Card, CardContent } from "@/components/ui/card";
import { Outlet } from "react-router";
import Threads from "@/app/background.tsx";
import { Toaster } from "@/components/ui/sonner";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { useEffect } from "react";

export default function Auth() {
  const { init } = useSidebarStore();

  useEffect(() => {
    if (location.pathname.startsWith("/auth")) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("token_type");
      init();
      console.log("token 已经被清除!!");
    }
  }, []); // [] 确保只执行一次

  return (
    <div className="bg-black">
      <div style={{ width: "100%", height: "100vh", position: "fixed" }}>
        <Threads
          amplitude={1.0}
          distance={0}
          enableMouseInteraction={true}
          color={[255, 255, 255]}
        />
      </div>
      <div className="flex min-h-screen flex-col items-center justify-center p-6 md:p-10 opacity-88">
        <div className="w-full max-w-sm md:max-w-3xl backdrop-blur-sm">
          <div className="flex flex-col gap-6">
            <Card className="overflow-hidden p-0">
              <CardContent className="grid p-0 md:grid-cols-2">
                <Outlet />
                <div className="bg-muted relative hidden md:block">
                  <img
                    src="/image.png"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
