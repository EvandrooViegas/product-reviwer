/**
 * @jest-environment jsdom
*/
import { expect, it } from "@jest/globals";
import { renderHook } from "@testing-library/react";
import { useEffect, useState } from "react";
import { useURL } from "../hooks/useURL";

it("should update the window name when the path changes", () => {
  
  window.location.pathname = "/"
  const useStateData = renderHook(() => useState({ name: "" }))
  const useStateProductData = renderHook(() => useState({ name: "" }))
  const useEffectHook = renderHook(() => useEffect(() => {  
    if(window.location.pathname === "/") document.title = `Seja Bem Vindo - ${useStateData.result.current[0].name}`
    if(window.location.pathname === "/product") document.title = `${useStateProductData.result.current[0].name} - ${useStateData.result.current[0].name}`
    
  }, [useStateData.result.current]))
  
  //Home
  setTimeout(() => {
    useStateData.result.current[1]({ name: "Evandro" })
    useStateData.rerender()
    expect(document.title).toBe("Seja Bem Vindo - Evandro")
  }, 1000)

  window.location.pathname = "/product"
  //Product
  setTimeout(() => {
    useStateProductData.result.current[1]({ name: "Cadeira" })
    useStateData.rerender()
    expect(document.title).toBe("Cadeira - Evandro")
  }, 1000)


});