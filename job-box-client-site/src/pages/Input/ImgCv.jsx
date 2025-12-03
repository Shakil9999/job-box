import axios from "axios";

const image_hosting_key = import.meta.env.VITE_image_hosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const ImgCv = () => {


    const handleCvImg1 = async(e)=>{
        e.preventDefault()

        //step 1. find img from form
        const img = e.target.cvImg1.files[0]
        console.log(img)

        //step 2. create form data
        const formData = new FormData();
        formData.append("image", img);

        //step 3. get img url from imgbb
        const res = await axios.post(image_hosting_api, formData, {
            headers: {'content-type': 'multipart/form-data'}
        })
        console.log(res.data.data.display_url)
    }

    const handleCvImg2 = async(e)=>{
        e.preventDefault()

        const img = e.target.cvImg2.files[0]
        console.log(img)

        const formData = new FormData()
        formData.append('image', img)

        const res =await axios.post(image_hosting_api, formData, {
            headers: { 'content-type': 'multipart-form-data'}
        })
        console.log(res.data)
    }


  return (
    <div>
      <form onSubmit={handleCvImg1}>
        <div className="my-10 space-x-6">
        <input  type="file" className="file-input file-input-primary" name="cvImg1"/>
        <button  type="submit" className="btn btn-primary">Primary</button>
      </div>
      </form>


        <form onSubmit={handleCvImg2}>
            <div className="my-10 space-x-6">
                <input type="file" className="file-input file-input-secondary" name="cvImg2"/>
                <button type="submit" className="btn btn-secondary">Secondary</button>
            </div>
        </form>

    </div>
  );
};

export default ImgCv;
