"use client";
import { Switch as HeadlessSwitch } from "@headlessui/react";

export default function Switch(props) {
  return <HeadlessSwitch {...props}>{props.children}</HeadlessSwitch>;
}
