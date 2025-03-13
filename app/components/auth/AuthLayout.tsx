"use client";

import { useEffect, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";

export enum Tab {
  LOGIN = "login",
  REGISTER = "register",
}

interface AuthLayoutProps {
  children: React.ReactNode;
  defaultTab?: Tab;
}

export default function AuthLayout({
  children,
  defaultTab = Tab.LOGIN,
}: AuthLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const [isMounted, setIsMounted] = useState(false);

  // Handle mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync URL with tab state
  useEffect(() => {
    if (!isMounted) return;

    const params = new URLSearchParams(searchParams.toString());
    if (params.get("tab") !== activeTab) {
      params.set("tab", activeTab);
      router.replace(`/auth?${params.toString()}`, { scroll: false });
    }
  }, [activeTab, router, searchParams, isMounted]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as Tab);
  };

  // Return early if not mounted
  if (!isMounted) {
    return null; // or a loading state
  }

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0">
          <img
            src="/about.webp"
            alt="Authentication background"
            className="object-cover opacity-90"
            
          />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          FinesseFinds
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This store has transformed how I shop for shoes. The
              quality and service are unmatched!&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome to FinesseFinds
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to continue
            </p>
          </div>
          <Tabs
            defaultValue={defaultTab}
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={Tab.LOGIN}>Login</TabsTrigger>
              <TabsTrigger value={Tab.REGISTER}>Register</TabsTrigger>
            </TabsList>
            <TabsContent value={Tab.LOGIN}>
              {activeTab === Tab.LOGIN && children}
            </TabsContent>
            <TabsContent value={Tab.REGISTER}>
              {activeTab === Tab.REGISTER && children}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
