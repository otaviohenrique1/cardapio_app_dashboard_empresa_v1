import { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, To } from "react-router-dom";

interface BotaoLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  color: ButtonColors;
  to: To;
}

export function BotaoLink(props: BotaoLinkProps) {
  return (
    <Link
      className={`btn btn-${props.color}`}
      {...props}
      to={props.to}
    >{props.children}</Link>
  );
}

