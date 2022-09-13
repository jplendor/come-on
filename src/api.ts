import axios from "axios"

// 임시 사용자 토큰 (로그인 가정)
const tempUserToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoic2FtcGxlIiwiYXV0aCI6IlJPTEVfVVNFUiIsInN1YiI6IjEiLCJleHAiOjE2NjQ1MDI3MDJ9.lZsHIu4FTxrLvA4XshmCrcKkUFBXHK2HkkQNaqykt_4"

const instance = axios.create({
  timeout: 3000,
})

const get = (endpoint: string): any => {
  return instance.get(endpoint, {
    headers: {
      Authorization: `Bearer ${tempUserToken}`,
    },
  })
}

const post = async (
  endpoint: string,
  data: object,
  hasFile: boolean
): Promise<any> => {
  const bodyData = hasFile ? data : JSON.stringify(data)

  return instance.post(endpoint, bodyData, {
    headers: {
      "Content-Type": hasFile ? "multipart/form-data" : "application/json",
      Authorization: `Bearer ${tempUserToken}`,
    },
  })
}

export { get, post }
