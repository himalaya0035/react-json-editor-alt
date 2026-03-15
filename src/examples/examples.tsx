import { useState } from "react";
import GlobalIndiviualModeExample from "./globalIndividualExample";
import GlobalModeExample from "./globalModeExample";
import IndividualModeExample from "./individualModeExample";
import InlineModeExample from "./inlineModeExample";
import { Documentation } from "./documentation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card";
import { Book, Code, Layers, Settings2, Github, BookOpen, Terminal, Copy, Check } from "lucide-react";
import { Button } from "../components/ui/button";

function Example() {
  const GITHUB_URL = "https://github.com/himalaya0035/react-json-editor-alt";
  const NPM_URL = "https://www.npmjs.com/package/react-json-editor-alt";
  const [activeTab, setActiveTab] = useState("inline");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("npm install react-json-editor-alt");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exampleJson = {
    name: "John Doe",
    age: 30,
    isAdult: true,
    gender: "male",
    description: "Hey, I am a software developer!",
    education: [
      {
        degree: "Bachelor of Science",
        major: "Computer Science",
        university: "Tech University",
        graduationYear: 2015,
      },
      {
        degree: "Master of Science",
        major: "Software Engineering",
        university: "Advanced Institute of Technology",
        graduationYear: 2017,
      },
    ],
    hobbies: ["coding", "reading", "hiking", "photography"],
    contact: {
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      address: {
        street: "123 Tech Lane",
        city: "San Francisco",
        state: "CA",
        zipCode: "94105",
        country: "USA",
      },
    },
  };

  const editableFieldObject: Record<string, any> = {
    gender: {
      type: "radio",
      options: [
        { key: "male", value: "male" },
        { key: "female", value: "female" },
        { key: "others", value: "others" },
      ],
    },
    description: {
      type: "textArea",
      validations: {
        minLength: 1,
        maxLength: 100,
      },
    },
    "contact.email": {
      type: "string",
      validations: {
        regex: /^[^@]+@[^@]+\.[^@]+$/,
        regexValidationMessage: "Please enter a valid email address.",
      },
    },
    "contact.address.country": {
      type: "select",
      options: [
        { key: "India", value: "India" },
        { key: "USA", value: "USA" },
      ],
    },
    "education.[].graduationYear": {
      type: "number",
      validations: {
        maxValue: new Date().getFullYear(),
        minLength: 4,
        maxLength: 4,
        validationMessage: `Please enter a valid year and the year can't be greater than ${new Date().getFullYear()}`,
      },
    },
    "education.0.major": {
      type: "string",
      validations: {
        maxLength: 30,
      },
    },
    "hobbies.1": {
      type: "string",
      validations: {
        maxLength: 20,
      },
    },
  };

  const nonEditableFieldsObject: Record<string, any> = {
    name: true,
    "education.[].degree": true,
    "contact.phone": true,
  };

  return (
    <div className="min-h-screen bg-slate-50/50 selection:bg-indigo-100 italic-selection">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-50 text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                v1.0.1
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
                React JSON Editor <span className="text-indigo-600 italic">Alt</span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                A powerful, type-safe, and highly customizable JSON editor for React. 
                Manage complex state with ease through interactive tree structures and curated input controls.
              </p>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-2">
                <div 
                  onClick={copyToClipboard}
                  className="flex items-center gap-3 px-4 py-2 bg-slate-900 rounded-lg border border-slate-800 cursor-pointer hover:border-indigo-500/50 transition-all group shrink-0"
                >
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <code className="text-sm text-slate-300 font-mono">npm i react-json-editor-alt</code>
                  <div className="ml-2 pl-2 border-l border-slate-800 text-slate-500 group-hover:text-indigo-400 transition-colors">
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700 h-11 px-8 rounded-full shadow-lg shadow-indigo-200 transition-all"
                  onClick={() => {
                    setActiveTab('docs');
                    document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                   View Documentation
                </Button>
                <Button 
                  variant="outline" 
                  className="h-11 px-8 rounded-full border-slate-200 hover:bg-slate-50 gap-2"
                  onClick={() => window.open(GITHUB_URL, '_blank')}
                >
                   <Github className="w-4 h-4" /> View on GitHub
                </Button>
                <Button 
                  variant="outline" 
                  className="h-11 px-6 rounded-full border-slate-200 hover:bg-slate-50 gap-2 text-slate-600"
                  onClick={() => window.open(NPM_URL, '_blank')}
                >
                   <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.666H5.334v-4H4V14H1.334v-5.334h5.332v5.334zm6.668 0h-1.334v-5.334h5.334v4h-1.334v-4h-1.334v5.334zm6.666 0h-2.666v1.332h-2.668v-1.332H16V8.666h5.334v5.334zM18.666 10h1.334v2.666h-1.334V10z"/></svg>
                   NPM
                </Button>
              </div>
            </div>
            
            <Card className="w-full md:w-80 border-slate-200/60 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Layers className="w-4 h-4 text-indigo-600" />
                        Key Features
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {[
                        "Inline/Global Editing",
                        "Type-based Rendering",
                        "Schema Validation",
                        "Array Support",
                        "Dark Mode Ready"
                    ].map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            {feature}
                        </div>
                    ))}
                </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Interactive Tabs Section */}
      <div id="playground" className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900">Resource Center</h2>
                <p className="text-slate-500">Explore editing modes and technical documentation.</p>
            </div>
            <TabsList className="bg-slate-100/80 p-1 rounded-xl flex-wrap h-auto min-h-[44px]">
              <TabsTrigger value="inline" className="rounded-lg px-4 py-2 flex items-center gap-2">
                <Settings2 className="w-4 h-4" />
                Inline
              </TabsTrigger>
              <TabsTrigger value="global" className="rounded-lg px-4 py-2 flex items-center gap-2">
                <Book className="w-4 h-4" />
                Global
              </TabsTrigger>
              <TabsTrigger value="individual" className="rounded-lg px-4 py-2 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Individual
              </TabsTrigger>
              <TabsTrigger value="global-individual" className="rounded-lg px-4 py-2 flex items-center gap-2">
                <Code className="w-4 h-4" />
                Mixed
              </TabsTrigger>
              <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block" />
              <TabsTrigger value="docs" className="rounded-lg px-4 py-2 flex items-center gap-2 text-indigo-600 data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                <BookOpen className="w-4 h-4" />
                Documentation
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="inline" className="focus-visible:outline-none focus-visible:ring-0">
             <InlineModeExample
                json={exampleJson}
                editableFieldObject={editableFieldObject}
                nonEditableFieldsObject={nonEditableFieldsObject}
              />
          </TabsContent>
          
          <TabsContent value="global" className="focus-visible:outline-none focus-visible:ring-0">
             <GlobalModeExample
                json={exampleJson}
                editableFieldObject={editableFieldObject}
                nonEditableFieldsObject={nonEditableFieldsObject}
              />
          </TabsContent>
          
          <TabsContent value="individual" className="focus-visible:outline-none focus-visible:ring-0">
             <IndividualModeExample
                json={exampleJson}
                editableFieldObject={editableFieldObject}
                nonEditableFieldsObject={nonEditableFieldsObject}
              />
          </TabsContent>

          <TabsContent value="global-individual" className="focus-visible:outline-none focus-visible:ring-0">
             <GlobalIndiviualModeExample
                json={exampleJson}
                editableFieldObject={editableFieldObject}
                nonEditableFieldsObject={nonEditableFieldsObject}
              />
          </TabsContent>

          <TabsContent value="docs" className="focus-visible:outline-none focus-visible:ring-0">
             <Documentation />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
            <p className="text-slate-500 text-sm">
                Built with ❤️ by <a href="https://github.com/himalaya0035" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-medium hover:underline">Himalaya Gupta</a>
            </p>
            <div className="flex justify-center gap-6">
                <button 
                  onClick={() => document.getElementById('playground')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium"
                >
                    Interactive Demo
                </button>
                <a 
                  href={GITHUB_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium flex items-center gap-1"
                >
                    GitHub <ExternalLink className="w-3 h-3" />
                </a>
                <a 
                  href="https://www.npmjs.com/package/react-json-editor-alt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-indigo-600 transition-colors text-sm font-medium"
                >
                    NPM
                </a>
            </div>
        </div>
      </footer>
    </div>
  );
}

// Helper component for small links
function ExternalLink({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}

export default Example;


