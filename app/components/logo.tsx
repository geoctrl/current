import React from "react";
import { Link } from "@remix-run/react";

export function Logo() {
  return (
    <Link to="/" className="rounded-none font-mono">
      Logo
    </Link>
  );
}
