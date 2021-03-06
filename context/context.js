/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react"
import { useRouter } from 'next/router'

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {
    const router = useRouter()
    const [showDrawer, setShowDrawer] = useState(false)
    const [query, setQuery] = useState('')

    useEffect(() => {
        router.events.on('routeChangeComplete', onRouteChange)
        return () => router.events.off('routeChangeComplete', onRouteChange)
    }, [query, router.events])

    const onRouteChange = () => {
        console.warn('Route changed!')
        setShowDrawer(false)
    }

    const formatSearchQuery = (str) => {
        let _keywords = []
        str.split(' ').forEach(word => {
            _keywords.push(word.toLowerCase())
        })
        return _keywords
    }

    const cancelSearch = () => {
        window.history.back()
    }

    const keyStr =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

    const triplet = (e1, e2, e3) =>
        keyStr.charAt(e1 >> 2) +
        keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
        keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
        keyStr.charAt(e3 & 63)

    const rgbDataURL = (r, g, b) =>
        `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)
        }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`

    return <BlogContext.Provider value={{
        showDrawer, setShowDrawer,
        query, setQuery,
        formatSearchQuery,
        cancelSearch,
        rgbDataURL
    }}>
        {children}
    </ BlogContext.Provider>
}