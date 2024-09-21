import {
  RenderObjectKeysProps,
  RenderObjectProps,
} from "../../../types/JsonEditor.types";
import { useJsonEditorContext } from "../jsonEditor";

// recursively renders a object, here object is neither an array nor null
function RenderObject({
  obj,
  path,
  renderJson,
  isRootLevelKey,
  searchText,
}: RenderObjectProps) {
  return (
    <ul
      className={
        isRootLevelKey
          ? "pl-5 mt-1.5 collapsible-identifier"
          : `hidden collapsible-identifier pl-5 mt-1.5 show`
      }
    >
      {Object.entries(obj).map(([key, val], index) => {
        return (
          <RenderObjectKeys
            keyName={key}
            val={val}
            key={index}
            searchText={searchText}
          >
            {renderJson(val, path ? `${path}.${key}` : key, false)}
          </RenderObjectKeys>
        );
      })}
    </ul>
  );
}

export default RenderObject;

function RenderObjectKeys({ keyName, val, children }: RenderObjectKeysProps) {
  const {isExpanded} = useJsonEditorContext();
  
  const toggleCollapsible = (element : HTMLElement) => {
    const isCollapsed = element.getAttribute("data-collapse") === "true";
    if (!isCollapsed) {
      element.setAttribute("data-collapse", "true");
      element.setAttribute("title", "Expand");
    } else {
      element.setAttribute("data-collapse", "false");
      element.setAttribute("title", "Collapse");
    }
  }

  if (typeof val === "object" && val !== null) {
    return (
      <li aria-hidden="true" className="add-collapsible-icon mb-1.5">
        <span
          data-collapse={!isExpanded}
          title="Expand"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter"){
              toggleCollapsible(e.target as HTMLElement)
            }
          }}
          className="cursor-pointer inline-block w-5 h-5 leading-5 text-center mr-1.5 bg-gray-200 rounded-full transition-transform duration-300 collapsible-icon"
          onClick={(e) => {
            toggleCollapsible(e.target as HTMLElement)
          }}
        ></span>
        <strong>
          {keyName}:{Array.isArray(val) ? " [ " : " { "}
          <span className="json-editor-props-count">
            {Object.keys(val).length + " props "}
          </span>
        </strong>
        {children}
        <strong>{Array.isArray(val) ? "]" : "}"}</strong>
      </li>
    );
  } else {
    return (
      <li className="mb-3 flex items-center gap-2">
        <strong>{keyName}:</strong>
        {children}
      </li>
    );
  }
}
