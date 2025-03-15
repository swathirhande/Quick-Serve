import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import { useEffect } from "react";
import { Input } from "../../components/ui/input" ;
import {Button} from "../../components/ui/button";
import LoadingButton from "../../components/LoadingButton"
import { User } from "@/types";


const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    addressLine1: z.string().min(1, "Address Line is required"), //atleast 1 character as an input
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
  });
//here the zod schema automatically detect the property and the type of those properties and assign it to the UserFormData
  export type UserFormData = z.infer<typeof formSchema>; 

  type Props = {
    currentUser: User;
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
    title?: string;
    buttonText?: string;
  };

  const UserProfileForm = ({onSave,isLoading, currentUser, title = "User Profile", buttonText = "Submit"}: Props) => {
    const form = useForm<UserFormData>({
      resolver: zodResolver(formSchema),
      defaultValues: currentUser, //when component loads if we have the currentUser values, then we want to assign the default values to that in the form
    });

    useEffect(()=>{
     form.reset(currentUser); 
    },[currentUser, form]) //if the component re-renders (if the currentUser changes) then call the reset function on the form this causes the form to re-render

return(
    <Form{...form}>
    <form onSubmit={form.handleSubmit(onSave)} className="space-y-4 mx-2 bg-gray-50 rounded-lg md:p-10">
    <div>
          <h2 className="text-2xl font-bold"> {title} </h2>
          <FormDescription>
            View and change your profile information here
          </FormDescription>
    </div>
    <FormField control={form.control} name="email" render={({ field }) => (
        <FormItem>
            <FormLabel>Email</FormLabel>
              <FormControl>
              <Input {...field} disabled className="bg-white" />
            </FormControl>
        </FormItem>
    )}
        />

<FormField control={form.control} name="name" render={({ field }) => (
        <FormItem>
            <FormLabel>Name</FormLabel>
              <FormControl>
              <Input {...field} className="bg-white" autoFocus={false} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )}
        />
<div className="flex flex-col md:flex-row gap-4">
          <FormField control={form.control} name="addressLine1" render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" autoFocus={false} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="city" render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" autoFocus={false} autoComplete="off" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField control={form.control} name="country" render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" autoFocus={false} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
 </div>
 {isLoading ? (
          <LoadingButton />
        ) : (
          <Button type="submit" className="bg-orange-500">
            {buttonText}
          </Button>
        )}


    </form>
    </Form>
)
  }

export default UserProfileForm;


/*
What is this component doing?
It renders a user profile form with fields like:
i)Email
ii)Name
iii)Address Line 1
iv)City
v)Country
It validates the form inputs using Zod (a schema validation library).
It manages form state using React Hook Form (useForm).
It disables email and name fields (assuming they should not be edited).
It calls an onSave function when the form is submitted.
It shows a loading state when the form is submitting.

What Happens When the User Submits the Form?
User enters data in the form.
React Hook Form validates inputs using the Zod schema.
If validation fails, error messages are displayed next to fields.
If validation passes, onSave(userProfileData) is called.
The parent component handles form submission (e.g., sending data to a backend). 
*/

/*The data flows as follows: 
UserProfileForm → handleSubmit(onSave) → onSave (which is updateUser) → mutateAsync → updateMyUserRequest → fetch → Backend
*/