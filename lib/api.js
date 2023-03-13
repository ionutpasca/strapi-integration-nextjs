import qs from 'qs'

export function getCMSURL(path = '') {
  return `${process.env.NEXT_PUBLIC_CMS_API_URL}${path}`
}

export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  const mergedOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CMS_API_TOKEN}`,
    },
    ...options,
  }

  const queryString = qs.stringify(urlParamsObject)
  const requestUrl = `${getCMSURL(
    `/api${path}${queryString ? `?${queryString}` : ''}`
  )}`

  const response = await fetch(requestUrl, mergedOptions)

  if (!response.ok) {
    console.error(response.statusText)
    throw new Error(`An error occured please try again`)
  }

  return response.json()
}
