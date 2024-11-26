
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { toast } from "react-hot-toast";
import { levels, sports, countries } from '../utils/constants.ts';

function Welcome() {
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [sport, setSport] = useState("");
  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const fetchId = async () => {
    const userId = (await supabase.auth.getUser()).data.user?.id as string;
    setId(userId);
  }

  useEffect(() => {
    fetchId();
  }, []);

  const handleProfileSetup = async (e: any) => {
    const { error } = await supabase
        .from('profile')
        .update({ has_setup_profile: true })
        .eq('id', (id as string))
    if (error) {
        console.log(error)
        toast.error('An error occured while setting up profile')
    } else {
        toast.success('Profile setup successfully')
    }
  }

  useEffect(() => {
    const fetchName = async () => {
      const { data, error } = await supabase
        .from('profile')
        .select('name')
        .eq('id', (id as string))
        .single();

      if (data) {
        setName(data.name);
      } else {
        console.error(error);
      }
    };

    fetchName();
  }, []);

  const redirect = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      
      await supabase
        .from("profile")
        .update({
          username: formData.get("username"),
          country: formData.get("country"),
          sport: formData.get("sport"),
          level: formData.get("level"),
        })
        .eq("id", id as string);
    } catch (error) {
      console.error(error);
      toast.error("An error occured while updating profile");
    }

    if (form) {
      handleProfileSetup(e);
      redirect(`/profile/${id}`);
    }

    form.reset();
  };

  

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-32">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl dark:text-white mb-3 font-semibold text-center">Welcome {name} !</h1>
        <h2 className="text-2xl dark:text-white font-semibold">Tell us about yourself</h2>
        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex flex-col mb-4">
            <Label htmlFor="username" className="mb-2">
              Username
            </Label>
            <TextInput
              type="text"
              id="username"
              name="username"
              addon="@"
            />
          </div>
          <div className="flex flex-col mb-4">
            <Label htmlFor="location" className="mb-2">
              Country
            </Label>
            <Select
              id="country"
              name="country"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col mb-4">
            <Label htmlFor="sport" className="mb-2">
              Sport
            </Label>
            <Select
              id="sport"
              name="sport"
            >
              {sports.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col mb-4">
            <Label htmlFor="level" className="mb-2">
              Level
            </Label>
            <Select
              id="level"
              name="level"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </Select>
          </div>
          <Button
            type="submit"
            color="success"
            
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Welcome;
