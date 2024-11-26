import {
    Button,
    Checkbox,
    Datepicker,
    FileInput,
    Label,
    Select,
    Textarea,
    TextInput,
    
  } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { toast } from "react-hot-toast";
import { levels, sports, countries } from '../utils/constants.ts';


export default function EditProfile() {
    const { id } = useParams<{ id: string }>();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [image, setImage] = useState('');
    const [sport, setSport] = useState('');
    const [level, setLevel] = useState('');
    const [country, setCountry] = useState('');
    const [birthday, setBirthday] = useState('');
    const [bio, setBio] = useState('');
    const [hasChangedDefaultImage, setHasChangedDefaultImage] = useState(false);
    const defaultUrl = 'https://lgxpumurghtoclmioznf.supabase.co/storage/v1/object/public/avatar/default/default_pdp.png';
    const changedUrl = `https://lgxpumurghtoclmioznf.supabase.co/storage/v1/object/public/avatar/images_${id}/profile_picture.png`;

    const storeImage = async (file: File) => {
        const filePath = `images_${id}/profile_picture.png`;
        const { data, error } = await supabase
            .storage
            .from('avatar')
            .upload(filePath, file, { upsert: true });
        
        if (error) {
            console.error(error);
            toast.error('An error occured while uploading profile picture');
        } else {
            toast.success('Profile picture uploaded successfully');
           
        }
    }


    const getUrl = () => {
        return hasChangedDefaultImage ? changedUrl : defaultUrl
    };

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('profile')
            .select('*')
            .eq('id', id)
            .single();

        if (data) {
            setName(data.name);
            setUsername(data.username);
            setCountry(data.country);
            setSport(data.sport);
            setLevel(data.level);
            setBirthday(data.birthday);
            setBio(data.bio);
            setImage(data.url_profile_picture); 
            
        } else {
            console.error(error);
            toast.error('User profile not found');
        }
    };

    const redirect = useNavigate();
  
    const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target;

    const formData = new FormData(form);
    
    const birthdayString = formData.get('birthday') as string;
    const birthdayDate = new Date(birthdayString).toISOString();

    if (new Date(birthdayDate) > new Date()) {
        toast.error('Birthday date cannot be in the future')
        form.reset()
        return
    }

    try {
        storeImage(formData.get('profilePicture') as File);

        const url = getUrl();
        const response = await supabase
            .from('profile')
            .update({
                name: formData.get('name'),
                username: formData.get('username'),
                country: formData.get('country'),
                sport: formData.get('sport'),
                level: formData.get('level'),
                birthday: birthdayDate,
                bio: formData.get('bio'),
                url_profile_picture: url
            })
            .eq('id', id);

        if (response.error) {
            throw response.error
        }

        

        toast.success('Profile updated successfully')
        redirect(`/profile/${id}`)
    } catch (error) {
        console.error(error);
        toast.error('An error occured while updating profile');
    }

   };

    const handleChange = async (e: any) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            if (url === defaultUrl) {
                setHasChangedDefaultImage(false);
            } else {
                setHasChangedDefaultImage(true);
            }
            setImage(url);
        }
    };

   useEffect(() => {
    fetchData();
    if (image === defaultUrl) {
        setHasChangedDefaultImage(false);
    } else {
        setHasChangedDefaultImage(true);
    }
   }, []);
  
  return (
    <div className="py-32 flex flex-col items-center">
        <h1 className="text-3xl dark:text-white font-semibold mb-4 relative">Edit Profile</h1>
        
        <div className="border shadow-md rounded-md bg-white dark:bg-gray-600 dark:border-gray-500">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center items-start p-16">

                <div className="flex gap-6 items-center w-full">
                    <img
                    alt="Profile picture"
                    height="96"
                    src={image}
                    width="96"
                    className="mb-3 rounded-full shadow-lg"
                    />
                    <div>
                        <div className="mb-2 block">
                        <Label htmlFor="profilePicture">Profile Picture</Label>
                        </div>
                        <FileInput className="dark:border rounded-lg" name="profilePicture" onChange={handleChange} />
                    </div>
                    
                </div>
                <div className=" w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="name">Name</Label>
                    </div>
                    <TextInput name="name" defaultValue={name} />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="username">Username</Label>
                    </div>
                    <TextInput name="username" defaultValue={username} />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor='birthday'>Birthday</Label>
                    </div>
                    <Datepicker name="birthday" id="birthday" defaultValue={birthday} maxDate={new Date()} required /> 
                </div>     
                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="country">Country</Label>
                    </div>
                    <Select name="country" defaultValue={country} >
                        {countries.map((country) => (
                            <option key={country} value={country}>
                            {country}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="sport">Sport</Label>
                    </div>
                    <Select name="sport" defaultValue={sport} >
                        {sports.map((sport) => (
                            <option key={sport} value={sport}>
                            {sport}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="level">Level</Label>
                    </div>
                    <Select name="level" defaultValue={level} >
                        {levels.map((level) => (
                            <option key={level} value={level}>
                            {level}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                    <Label htmlFor="bio">Bio</Label>
                    </div>
                    <Textarea className="h-32" name="bio" placeholder="Write a beautiful bio which describe yourself and your sports..." defaultValue={bio} />
                </div>
                <div className="mt-3 flex gap-2">
                    <Button type="submit"  size='lg' color="success">Save</Button>
                    <Button className="border dark:text-white" size="lg" type="button" color="Light"><Link to={`/profile/${id}`}>Go back</Link></Button>
                </div>
            </form>
      </div>
    </div>
  )
}
