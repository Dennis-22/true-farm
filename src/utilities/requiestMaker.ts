export default async function requestMaker(url:string){
    let data = {success:false, data:[]}
    try {
        let results = await fetch(url)
        let response = await results.json()
        data = {success:true, data:response.data}
    } catch (error) {
        console.log(error)
        data = {success:false, data:[]}
    }finally{
        return data
    }
}