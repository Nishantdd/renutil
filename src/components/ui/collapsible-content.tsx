import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./collapsible";
import { ChevronRight } from "lucide-react";

export default function CollapsibleMenu({
  children,
  className,
  title,
  ...props
}: {
  children: React.ReactNode,
  className?: string,
  title: string
}) {
  return (
    <Collapsible
      title={title}
      className={`group/collapsible ${className}`}
      {...props}
    >
      <CollapsibleTrigger className="hover:underline">
        {`${title} `}
        <ChevronRight className="ml-auto inline transition-transform group-data-[state=open]/collapsible:rotate-90" />
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
