import { AnchorHTMLAttributes, ReactNode } from "react";
import { Link, To } from "react-router-dom";

interface BotaoLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  color: ButtonColors;
  to: To;
}

export function BotaoLink(props: BotaoLinkProps) {
  const { color, to, children } = props;
  return (
    <Link
      className={`btn btn-${color}`}
      {...props}
      to={to}
    >{children}</Link>
  );
}

