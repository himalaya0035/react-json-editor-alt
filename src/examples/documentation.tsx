import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Book, CheckCircle2, Code2, Info, Terminal, Settings2, Layers, ShieldCheck, AlertCircle } from "lucide-react";

export function Documentation() {
  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-500">
      {/* Installation & Quick Start */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        <section className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-600">
            <Code2 className="w-6 h-6" />
            <h2 className="text-2xl font-bold tracking-tight">Quick Start</h2>
          </div>
          <Card className="bg-slate-950 border-slate-800 h-[calc(100%-2.5rem)]">
            <CardContent className="p-0">
              <pre className="p-6 text-indigo-300 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
{`import { JsonEditor } from 'react-json-editor-alt';

const App = () => {
  const [data, setData] = useState({ name: "John" });

  return (
    <JsonEditor 
      json={data} 
      onChange={(res) => setData(res.updatedJson)}
    />
  );
};`}
              </pre>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* API Reference */}
      <section className="space-y-8">
        <div className="flex items-center gap-2 text-indigo-600">
          <Book className="w-6 h-6" />
          <h2 className="text-2xl font-bold tracking-tight">API Reference</h2>
        </div>

        <Tabs defaultValue="props" className="w-full">
          <TabsList className="bg-slate-100/80 mb-6 p-1 rounded-xl w-full max-w-2xl">
            <TabsTrigger value="props" className="w-full">Main Props</TabsTrigger>
            <TabsTrigger value="config" className="w-full">Editing Config</TabsTrigger>
            <TabsTrigger value="validations" className="w-full">Validations</TabsTrigger>
            <TabsTrigger value="advanced" className="w-full">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="props" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "json", type: "object (required)", desc: "The core data to be rendered and edited. Cannot be null." },
                { name: "isExpanded", type: "boolean (optional)", desc: "Determines if nested structures are expanded by default. Default: false." },
                { name: "onChange", type: "(res) => void", desc: "Callback triggered on every field modification." },
                { name: "onSubmit", type: "(res) => void", desc: "Callback triggered on manual save/submission." },
                { name: "styles", type: "React.CSSProperties", desc: "Inline styles for the root container." },
                { name: "className", type: "string", desc: "Custom CSS/Tailwind classes for styling." },
                { name: "globalSubmitButtonConfigs", type: "object", desc: "Configure text, variant, and styling of the submit button." }
              ].map((prop, i) => (
                <Card key={i} className="bg-white border-slate-200">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-indigo-600 text-base font-bold">{prop.name}</CardTitle>
                    <p className="text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 w-fit">{prop.type}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 leading-relaxed">{prop.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-indigo-50/50 border-indigo-100">
              <CardContent className="p-4 flex gap-3 text-sm text-indigo-700">
                <Info className="w-5 h-5 shrink-0" />
                <p><strong>Callback Object:</strong> Both callbacks receive <code>initialJson</code>, <code>updatedJson</code>, <code>updatedKeys</code> (diff), and <code>editorMode</code>.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="config" className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-indigo-600" />
                Editing Configurations
              </h3>
              <p className="text-sm text-slate-600">The <code>editingConfig</code> object controls core interaction behavior.</p>
              <div className="overflow-hidden rounded-xl border border-slate-100">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Property</th>
                      <th className="px-4 py-3 text-xs font-bold text-slate-500 uppercase">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {[
                      { name: "editingMode", desc: "Choose from 'inline', 'global', 'individual', or 'global-individual'." },
                      { name: "isEditing", desc: "Toggle edit state for global/individual modes." },
                      { name: "allFieldsEditable", desc: "Globally toggle editability (defaults to true)." },
                      { name: "editableFields", desc: "Define per-path types and validations." },
                      { name: "nonEditableFields", desc: "Explicitly block paths from being edited." }
                    ].map((item, i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 font-mono text-indigo-600 font-medium">{item.name}</td>
                        <td className="px-4 py-3 text-slate-600">{item.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-indigo-900 text-indigo-50 space-y-6">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                <h3 className="text-lg font-bold italic">💡 Special Array Targeting: []</h3>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Manually targeting array items is tedious. Use the <code>[]</code> syntax to apply rules across all items in an array simultaneously.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase opacity-60">Input Data</p>
                  <pre className="p-4 bg-slate-900/50 rounded-lg text-xs font-mono">
{`{
  "users": [
    { "id": 1 },
    { "id": 2 }
  ]
}`}
                  </pre>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase opacity-60">Target Path</p>
                  <pre className="p-4 bg-slate-900/50 rounded-lg text-xs font-mono text-indigo-300">
{`"users.[].id": {
  "type": "number",
  "nonEditable": true
}`}
                  </pre>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="validations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    Validation Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-y border-slate-100">
                      <tr>
                        <th className="px-6 py-4 font-bold">Rule</th>
                        <th className="px-6 py-4 font-bold">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { rule: "minLength / maxLength", desc: "Limits character count for strings/textareas." },
                        { rule: "minValue / maxValue", desc: "Sets bounds for number inputs." },
                        { rule: "regex", desc: "Custom pattern validation (e.g. Email, URLs)." },
                        { rule: "validationMessage", desc: "Custom text shown on length/value errors." },
                        { rule: "regexValidationMessage", desc: "Custom text shown on regex mismatch." }
                      ].map((v, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 font-mono font-medium text-slate-900">{v.rule}</td>
                          <td className="px-6 py-4 text-slate-500">{v.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="p-6 rounded-2xl bg-amber-50 border border-amber-100 space-y-3">
                  <div className="flex items-center gap-2 text-amber-700">
                    <AlertCircle className="w-5 h-5" />
                    <h4 className="font-bold">Regex Priority</h4>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    When using <code>regex</code>, length-based validations (min/max) are often redundant as the pattern can handle those constraints itself.
                  </p>
                </div>
                <Card className="bg-slate-950 border-slate-800">
                  <CardContent className="p-4">
                    <p className="text-[10px] font-bold text-slate-500 uppercase mb-2">Regex Example</p>
                    <pre className="text-[10px] text-green-400 font-mono">
{`"email": {
  "type": "string",
  "validations": {
    "regex": /^[^@]+@[^@]+$/,
    "regexValidationMessage": "Invalid Email"
  }
}`}
                    </pre>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                      <Terminal className="w-4 h-4" />
                    </div>
                    Debouncing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-600">
                    Controls performance for large JSON objects. When enabled, <code>onChange</code> fires 300ms after the user stops typing.
                  </p>
                  <p className="text-sm font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded w-fit">debouncing: true</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-bold flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    Type-Based Rendering
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-600">
                    Automatically detects data types. Booleans become toggles, numbers get specialized inputs, and objects/arrays form trees.
                  </p>
                  <p className="text-sm font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded w-fit">enableTypeBasedRendering: true</p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-slate-50 border-dashed border-2 border-slate-200">
              <CardContent className="p-8 text-center space-y-3">
                <h4 className="text-lg font-bold text-slate-900">Ready to go?</h4>
                <p className="text-sm text-slate-600">Review the interactive examples above to see these configurations in action with real data.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
