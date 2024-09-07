import {
  RenderArrayItemsProp,
  RenderArrayProps,
} from "../../../types/JsonEditor.types";

function RenderArray({
  arr,
  path,
  isRootLevelKey,
  isExpanded,
  renderJson,
}: RenderArrayProps) {
  const handleCollapsible = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    const spanElement = e.target as HTMLElement;
    const isCollapsed = spanElement.getAttribute("data-collapse") === "true";
    if (!isCollapsed) {
      spanElement.setAttribute("data-collapse", "true");
      spanElement.setAttribute("title", "Expand");
    } else {
      spanElement.setAttribute("data-collapse", "false");
      spanElement.setAttribute("title", "Collapse");
    }
  };

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
              onClick={handleCollapsible}
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
