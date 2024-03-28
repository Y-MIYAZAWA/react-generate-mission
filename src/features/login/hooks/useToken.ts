export const useToken = (count: number): string => {
  let token = "";

  for(let i = 0; i < count; i++){
    let addNumber = Math.floor(Math.random() * 10)
    token += addNumber.toString();
  }

  return (token)
}