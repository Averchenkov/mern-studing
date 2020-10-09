import React, {useCallback, useContext, useEffect, useState} from "react"
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinksList} from "../components/LinksList";

export const LinksPage = () =>{
  const [links, setLinks] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const fethedLinks = useCallback(async () => {
    try {
      const fetched = await request("/api/link", "GET", null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched, request)
    } catch (e) {}
  }, [token])

  useEffect(() => {
    fethedLinks()
  }, [fethedLinks])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <LinksList links={links}/>}
    </>
  )
}