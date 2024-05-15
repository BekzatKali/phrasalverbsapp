"use server"

import { revalidatePath } from "next/cache";
import { PhrasalVerb, User } from "./models";
import connectToDB from "./utils";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

interface UserUpdateFields {
    username?: string;
    email?: string;
    password?: string;
    isAdmin?: string;
}

interface PhrasalVerbUpdateFields {
    phrasalVerb?: string,
    example?: string
}

export const addUser = async (formData: any) => {
    const { username, email, password, isAdmin } = Object.fromEntries(formData);

    try {
        connectToDB();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            isAdmin
        });
        await newUser.save();
    } catch (err) {
        console.log(err);
        throw new Error("Failed to add user");
    }
}

export const addPhrasalVerb = async (formData: any) => {
    const { phrasalVerb, example, userId } = Object.fromEntries(formData);
    
    try {
        connectToDB();
        
        const newPhrasalVerb = new PhrasalVerb({
            phrasalVerb,
            example,
            user: userId
        });
        
        await newPhrasalVerb.save();
    } catch (err) {
        console.log(err);
        throw new Error("Failed to add phrasal verb");
    }
    revalidatePath("/dashboard");
}

export const fetchUsers = async () => {
    try {
        connectToDB();
        const users = await User.find();
        return users;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch users");
    }
}

export const deleteUser = async (formData: any) => {
    const { id } = Object.fromEntries(formData);
    try {
        connectToDB();
        await User.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete user");
    }
    revalidatePath("/users");
}

export const fetchUser = async (id: string) => {
    try {
        connectToDB();
        const user = await User.findById(id);
        return user;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch user");
    }
}

export const updateUser = async (formData: any) => {
    const { id, username, email, password, isAdmin } = Object.fromEntries(formData);
    
    try {
      connectToDB();
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const updateFields = {
        username,
        email,
        password: hashedPassword,
        isAdmin,
      }

      Object.keys(updateFields).forEach((key) => {
        if (!updateFields[key as keyof UserUpdateFields]) {
          delete updateFields[key as keyof UserUpdateFields];
        }
      });
  
      await User.findByIdAndUpdate(id, updateFields);
    } catch (error) {
      console.log(error);
      throw new Error('Failed to update user')
    }
    revalidatePath("/users");
    redirect("/users");
}

export const getPhrasalVerbsByUserId = async (formData: any) => {
    const { id } = formData;
    try {
        connectToDB();
        const phrasalVerbs = await PhrasalVerb.find({ user: id });
        return phrasalVerbs;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch phrasal verbs");
    }
}

export const deletePhrasalVerbById = async (id: string) => {
    try {
        connectToDB();
        await PhrasalVerb.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        throw new Error("Failed to delete phrasal verb");
    }
    revalidatePath('/dashboard');
}

export const updatePhrasalVerb = async ({ id, phrasalVerb, example }: {id: string, phrasalVerb: string, example: string}) => {
    try {
        connectToDB();

        const updateFields = {
            phrasalVerb,
            example
        }

        Object.keys(updateFields).forEach((key) => {
            if (!updateFields[key as keyof PhrasalVerbUpdateFields]) {
              delete updateFields[key as keyof PhrasalVerbUpdateFields];
            }
        });

        await PhrasalVerb.findByIdAndUpdate(id, updateFields);
        console.log("successful update of phrasal verb happened");
    } catch (err) {
        console.log(err);
        throw new Error("Failed to update phrasal verb");
    }

    revalidatePath("/dashboard")
}


export const getAllPhrasalVerbs = async () => {
    try {
        connectToDB();
        const phrasalVerbs = await PhrasalVerb.find({}).populate('user');
        return phrasalVerbs;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to fetch phrasal verbs");
    }
}

export const userRegistration = async (formData: any) => {
    const { username, email, password } = Object.fromEntries(formData);

    try {
        connectToDB();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
    } catch (err) {
        console.log(err);
        throw new Error("Failed to add user");
    }

    redirect("/dashboard");
} 