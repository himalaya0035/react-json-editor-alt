import {
  RenderArrayItemsProp,
  RenderArrayProps,
} from "../../../types/JsonEditor.types";
import { useJsonEditorContext } from "../jsonEditor";

function RenderArray({
  arr,
  path,
  isRootLevelKey,
  renderJson,
}: RenderArrayProps) {
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

  return (
    <ul
      className={
        isRootLevelKey
          ? "pl-5 mt-1.5"
          : "collapsible-identifier hidden pl-5 mt-1.5"
      }
    >
      {arr.map((val: any, index: number) => {
        return (
          <RenderArrayItems val={val} key={index}>
            <span
              data-collapse={!isExpanded}
              title="Expand"
              onClick={(e) => {
                toggleCollapsible(e.target as HTMLElement)
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter"){
                  toggleCollapsible(e.target as HTMLElement)
                }
              }}
              className="cursor-pointer float-left min-w-2.5 px-2 rounded-sm mr-2 text-[0.9em] text-center bg-gray-200"
            >
              {index}:
            </span>{" "}
            <span className="float-left mr-1">:</span>{" "}
            {renderJson(val, `${path}.${index}`, true)}
          </RenderArrayItems>
        );
      })}
    </ul>
  );
}

export default RenderArray;

function RenderArrayItems({ val, children }: RenderArrayItemsProp) {
  if (typeof val === "object" && val !== null) {
    return (
      <li className="mb-1.5">
        <strong>
          {Array.isArray(val) ? "[" : "{"}
          <span className="json-editor-props-count">
            {Object.keys(val).length + " props "}
          </span>
        </strong>
        {children}
        <strong>{Array.isArray(val) ? "]," : "},"}</strong>
      </li>
    );
  } else {
    return <li className="mb-3 flex items-center gap-1">{children}</li>;
  }
}
