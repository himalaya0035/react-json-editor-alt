import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import { Code2, Play } from "lucide-react";

interface ComponentWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  code: string;
  config: string;
}

export function ComponentWrapper({
  title,
  description,
  children,
  code,
  config,
}: ComponentWrapperProps) {
  return (
    <div className="flex flex-col gap-6 py-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h2>
        <p className="text-lg text-slate-600 max-w-2xl">{description}</p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px] mb-4">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Interactive Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            Configuration & JSON
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="mt-0">
          <Card className="min-h-[500px] transition-all duration-300 hover:shadow-md">
            <CardContent className="p-6">
              {children}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="code" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Example JSON Data</h3>
              <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 overflow-auto max-h-[500px] text-xs leading-relaxed font-mono border border-slate-800">
                <code>{jsonStringify(JSON.parse(code))}</code>
              </pre>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">Editor Configuration</h3>
              <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 overflow-auto max-h-[500px] text-xs leading-relaxed font-mono border border-slate-800">
                <code>{config}</code>
              </pre>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function jsonStringify(obj: any) {
  return JSON.stringify(obj, null, 2);
}
