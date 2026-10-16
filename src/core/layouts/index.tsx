import React, { useEffect, useState } from "react"

//import Components
import { FooterRest, Header } from "@/core/ui"
import Sidebar from "./Sidebar"

//import actions
import {
  changeLayout,
  changeLayoutMode,
  changeLayoutPosition,
  changeLayoutTheme,
  changeLayoutThemeColor,
  changeLayoutWidth,
  changeLeftsidebarSizeType,
  changeLeftsidebarViewType,
  changeSidebarImageType,
  changeSidebarTheme,
  changeSidebarVisibility,
  changeTopbarTheme,
} from "@/slices/thunks"

import { useAppDispatch } from "@/index"
import { useAuth } from "@/shared/hooks"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"

interface LayoutProps {
  children: React.ReactNode
}
const Layout = ({ children }: LayoutProps) => {
  const { session } = useAuth()
  const [headerClass, setHeaderClass] = useState("")
  const dispatch = useAppDispatch()

  const selectLayoutState = (state: any) => state.Layout
  const selectLayoutProperties = createSelector(selectLayoutState, (layout) => ({
    layoutType: layout.layoutType,
    leftSidebarType: layout.leftSidebarType,
    layoutModeType: layout.layoutModeType,
    layoutThemeColorType: layout.layoutThemeColorType,
    layoutThemeType: layout.layoutThemeType,
    layoutWidthType: layout.layoutWidthType,
    layoutPositionType: layout.layoutPositionType,
    topbarThemeType: layout.topbarThemeType,
    leftsidbarSizeType: layout.leftsidbarSizeType,
    leftSidebarViewType: layout.leftSidebarViewType,
    leftSidebarImageType: layout.leftSidebarImageType,
    preloader: layout.preloader,
    sidebarVisibilitytype: layout.sidebarVisibilitytype,
  }))
  // Inside your component
  const {
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutThemeColorType,
    layoutThemeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    sidebarVisibilitytype,
  } = useSelector(selectLayoutProperties)

  /*
    layout settings
    */
  useEffect(() => {
    window.dispatchEvent(new Event("resize"))

    dispatch(changeLeftsidebarViewType(leftSidebarViewType))
    dispatch(changeLeftsidebarSizeType(leftsidbarSizeType))
    dispatch(changeSidebarTheme(leftSidebarType))
    dispatch(changeLayoutThemeColor(layoutThemeColorType))
    dispatch(changeLayoutTheme(layoutThemeType))
    dispatch(changeLayoutMode(layoutModeType))
    dispatch(changeLayoutWidth(layoutWidthType))
    dispatch(changeLayoutPosition(layoutPositionType))
    dispatch(changeTopbarTheme(topbarThemeType))
    dispatch(changeLayout(layoutType))
    dispatch(changeSidebarImageType(leftSidebarImageType))
    dispatch(changeSidebarVisibility(sidebarVisibilitytype))
  }, [
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutThemeType,
    layoutThemeColorType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    sidebarVisibilitytype,
    dispatch,
  ])
  /*
    call dark/light mode
    */
  const onChangeLayoutMode = (value: any) => {
    dispatch(changeLayoutMode(value))
  }

  function scrollNavigation() {
    const scrollup = document.documentElement.scrollTop
    if (scrollup > 50) {
      setHeaderClass("topbar-shadow")
    } else {
      setHeaderClass("")
    }
  }

  // class add remove in header
  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true)

    return () => {
      window.removeEventListener("scroll", scrollNavigation, true)
    }
  }, [])

  useEffect(() => {
    const humberIcon = document.querySelector(".hamburger-icon") as HTMLElement
    if (!humberIcon) return
    if (
      sidebarVisibilitytype === "show" ||
      layoutType === "vertical" ||
      layoutType === "twocolumn"
    ) {
      humberIcon.classList.remove("open")
    } else {
      humberIcon.classList.add("open")
    }
  }, [sidebarVisibilitytype, layoutType])

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header
          headerClass={headerClass}
          layoutModeType={layoutModeType}
          onChangeLayoutMode={onChangeLayoutMode}
        />
        {session?.activeClinic && session.user.onboardingStep === "FINISHED" && (
          <Sidebar layoutType={layoutType} />
        )}
        <div className="main-content">
          {children}
          <FooterRest />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Layout
