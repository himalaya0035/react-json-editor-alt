import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Book, CheckCircle2, Code2, Info, Terminal } from "lucide-react";

export function Documentation() {
  return (
    <div className="space-y-10 pb-12 animate-in fade-in duration-500">
      {/* Installation */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-600">
          <Terminal className="w-6 h-6" />
          <h2 className="text-2xl font-bold tracking-tight">Installation</h2>
        </div>
        <Card className="bg-slate-950 border-slate-800">
          <CardContent className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-slate-400">Using npm:</p>
                <code className="px-4 py-2 rounded bg-slate-900 text-indigo-400 font-mono text-sm border border-slate-800">
                  npm install react-json-editor-alt
                </code>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-slate-400">Using yarn:</p>
                <code className="px-4 py-2 rounded bg-slate-900 text-indigo-400 font-mono text-sm border border-slate-800">
                  yarn add react-json-editor-alt
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-600">
          <Code2 className="w-6 h-6" />
          <h2 className="text-2xl font-bold tracking-tight">Quick Start</h2>
        </div>
        <p className="text-slate-600 max-w-3xl">
          Import the <code className="text-indigo-600 bg-indigo-50 px-1 rounded">JsonEditor</code> and start editing your JSON structures in minutes.
        </p>
        <Card className="bg-slate-950 border-slate-800">
          <CardHeader className="border-b border-slate-800 pb-4">
            <CardTitle className="text-sm font-medium text-slate-400">Basic integration example</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <pre className="p-6 text-indigo-300 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
{`import { JsonEditor } from 'react-json-editor-alt';

const MyComponent = () => {
  const [data, setData] = useState({ name: "John" });

  return (
    <JsonEditor 
      json={data} 
      onChange={(res) => setData(res.updatedJson)}
      editingConfig={{
        editingMode: "inline"
      }}
    />
  );
};`}
            </pre>
          </CardContent>
        </Card>
      </section>

      {/* Props Reference */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-indigo-600">
          <Book className="w-6 h-6" />
          <h2 className="text-2xl font-bold tracking-tight">API Reference</h2>
        </div>

        <Tabs defaultValue="props" className="w-full">
          <TabsList className="bg-slate-100/80 mb-6 p-1 rounded-lg w-full max-w-md">
            <TabsTrigger value="props" className="w-full">Main Props</TabsTrigger>
            <TabsTrigger value="config" className="w-full">Editing Config</TabsTrigger>
            <TabsTrigger value="callbacks" className="w-full">Callbacks</TabsTrigger>
          </TabsList>

          <TabsContent value="props">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "json", type: "object (required)", desc: "The JSON data to render and edit." },
                { name: "isExpanded", type: "boolean", desc: "Default expansion state of the tree structure." },
                { name: "styles", type: "object", desc: "Custom inline styles for the editor container." },
                { name: "className", type: "string", desc: "Tailwind or CSS classes for the container." },
                { name: "editingConfig", type: "object", desc: "Core behavioral configuration (see next tab)." }
              ].map((prop, i) => (
                <Card key={i} className="bg-white border-slate-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-indigo-600 text-base">{prop.name}</CardTitle>
                    <p className="text-[10px] items-center px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 w-fit">{prop.type}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 leading-relaxed">{prop.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="config">
            <Card>
              <CardContent className="p-0 overflow-hidden rounded-xl border-slate-200">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-900">Property</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-900">Type</th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-900">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: "editingMode", type: "inline | global | individual", desc: "Defines the interaction model." },
                      { name: "isEditing", type: "boolean", desc: "Toggle read/write state (for non-inline modes)." },
                      { name: "debouncing", type: "boolean", desc: "Performance optimization for large JSONs." },
                      { name: "allFieldsEditable", type: "boolean", desc: "Control global editability baseline." },
                      { name: "editableFields", type: "object", desc: "Specific definitions for custom inputs." }
                    ].map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-indigo-600">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-500 font-medium">{item.type}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{item.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="callbacks">
            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/30">
                <div className="flex items-center gap-2 text-indigo-700 mb-2">
                  <Info className="w-4 h-4" />
                  <span className="text-sm font-semibold">Callback Parameters</span>
                </div>
                <p className="text-sm text-slate-600">Both <code className="bg-white/60 px-1 rounded text-indigo-700">onChange</code> and <code className="bg-white/60 px-1 rounded text-indigo-700">onSubmit</code> receive a powerful context object:</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {[
                  { label: "initialJson", desc: "The state of the JSON before any edits." },
                  { label: "updatedJson", desc: "The current complete state of the data." },
                  { label: "updatedKeys", desc: "Detailed diff of what exactly changed." },
                  { label: "editorMode", desc: "The mode the editor was in during the event." }
                ].map((p, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-white border border-slate-100 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-900">{p.label}</span>
                      <p className="text-slate-500 text-xs mt-1">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
