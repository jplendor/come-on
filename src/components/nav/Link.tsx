/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react"
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom"

import { Url } from "types/auth"
import Link from "@mui/material/Link"

interface LinkComponentProps {
  to: Url
  children: React.ReactNode
}

export const LinkComponent = ({
  to,
  children,
}: LinkComponentProps): JSX.Element => {
  return (
    <Link component={RouterLink} to={to} underline="none">
      {children}
    </Link>
  )
}

/**
 * MUI Link, 버튼 href 기본속성 -> react-router 변경
 */

export const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props
  // Map href (MUI) -> to (react-router)
  return <RouterLink data-testid="custom-link" ref={ref} to={href} {...other} />
})
