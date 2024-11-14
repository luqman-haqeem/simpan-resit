"use server";

import { encodedRedirect } from "@/utils/utils";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  } else {
    return encodedRedirect(
      "success",
      "/sign-up",
      "Thanks for signing up! Please check your email for a verification link."
    );
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/login", error.message);
  }

  return redirect("/protected");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password"
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password."
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect(
      "error",
      "/protected/reset-password",
      "Password update failed"
    );
  }

  encodedRedirect("success", "/protected/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
};

export const getUserReceipts = async (year: string) => {
  "use server";

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("receipts")
    .select(
      `
    *,
    relief_categories (
      id,
      name
    )
  `
    )
    .eq("year", year);
  console.log(data);

  if (error) {
    console.log(error);
  }
  return data;
};

export const getUserDetails = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export const getReliefCategories = async () => {
  "use server";

  const supabase = await createClient();
  const { data, error } = await supabase.from("relief_categories").select(`*`);

  if (error) {
    console.log(error);
  }
  return data;
};

export const createReceipt = async (receiptInfo: any) => {
  console.log("Form submitted server");
  console.log(receiptInfo);
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log("Invalid user");
    redirect("/login");
  }
  const receiptDate = receiptInfo.get("receiptDate") || null;
  const receiptTitle = receiptInfo.get("title");
  const receiptAmount = receiptInfo.get("amount");
  const categoryId = receiptInfo.get("categoryId");
  const receiptFile = receiptInfo.get("receiptFile");

  const year = receiptDate
    ? new Date(receiptDate).getFullYear()
    : new Date().getFullYear();

  let path = "";
  if (receiptFile && receiptFile.name) {
    console.log("upload file");

    // console.log("receiptFile", receiptFile);

    const fileName = new Date().getTime();
    path = `${data.user.id}/${year}/${fileName}`;

    console.log(path);

    const { error } = await supabase.storage
      .from("receipts")
      .upload(path, receiptFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log(error);
      return {
        status: "failed",
        message: `Unable to upload ${receiptTitle} receipt`,
      };
    }
  }

  const insertData = {
    title: receiptTitle,
    user_id: data.user.id,
    amount: receiptAmount,
    receipt_date: receiptDate,
    category_id: categoryId,
    year,
    file_url: path,
    created_at: new Date(),
  };
  console.log(insertData);

  const { data: receipt, error: receiptError } = await supabase
    .from("receipts")
    .insert(insertData)
    .select();

  revalidatePath("/protected/receipts");

  if (receiptError) {
    console.log(receiptError);
    return {
      status: "failed",
      message: `Receipt ${receiptTitle} Not Added`,
    };
  }

  return {
    status: "success",
    message: `Successfully added ${receiptTitle}`,
  };

  //   console.log(receipt);
};

export const deleteReceipt = async (receiptId: number) => {
  console.log(receiptId);
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    console.log("Invalid user");
    redirect("/login");
  }
  //   console.log("data.user.id", data.user.id);
  //   console.log("receiptId", receiptId);

  const { data: receipt, error: receiptError } = await supabase
    .from("receipts")
    .delete()
    .eq("id", receiptId)
    .eq("user_id", data.user.id);

  if (receiptError) {
    console.log("receiptError", receiptError);
    return {
      status: "failed",
      message: `Receipt Not Deleted`,
    };
  }

  console.log("receipt", receipt);
  revalidatePath("/protected/receipts");

  return {
    status: "success",
    message: `Successfully deleted receipt`,
  };
};

interface PersonalInfo {
  gender: string;
  isGovernmentServant: boolean;
  isDisabled: boolean;
  maritalStatus: string;
  isSpouseDisabled: boolean;
  isSpouseWorking: boolean;
  numberOfChildren: number;
}
export const updatePersonalInfo = async (personalInfo: PersonalInfo) => {
  console.log("form submitted in server", personalInfo);

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    console.log("Invalid user");
    // redirect("/login");
  }

  const insertData = {
    user_id: data?.user?.id,
    gender: personalInfo.gender,
    is_government_servant: personalInfo.isGovernmentServant,
    is_disabled: personalInfo.isDisabled,
    marital_status: personalInfo.maritalStatus,
    is_spouse_disabled: personalInfo.isSpouseDisabled,
    is_spouse_working: personalInfo.isSpouseWorking,
    number_of_children: personalInfo.numberOfChildren,
    created_at: new Date(),
  };

  console.log(insertData);

  const { data: updateInfo, error: updateError } = await supabase
    .from("users_details")
    .upsert(insertData, { onConflict: "user_id" })

    .select();

  if (updateError) {
    console.log(updateError);
  }
};

export const fetchReliefUtilization = async () => {
  const supabase = await createClient();
  const { data: userInfo, error: userInfoError } =
    await supabase.auth.getUser();

  if (userInfoError || !userInfo?.user) {
    console.log("Invalid user");
    redirect("/login");
  }

  const { data: taxUtils, error } = await supabase
    .from("receipts")
    .select(
      `relief_categories (
          name,
          relief_limits (
            limit_amount
          )
        ),
        amount`
    )
    .eq("user_id", userInfo.user.id);

  if (error) {
    console.log(error);
    throw error;
  }
  const categoryTotals = taxUtils?.reduce(
    (acc: any, receipt: any) => {
      console.log("test");
      console.log("receipt", receipt.relief_categories);

      const categoryName = receipt.relief_categories?.name;
      const amount = receipt.amount;

      let category = acc.find((cat: any) => cat.name === categoryName);
      if (!category) {
        category = {
          name: categoryName,
          used: 0,
          limit: receipt.relief_categories?.relief_limits[0]?.limit_amount ?? 0,
          percentage: 0,
        };
        acc.push(category);
      }
      //   console.log("name", categoryName);
      //   console.log("b4", category.used);

      category.used += amount;
      //   console.log("after", category.used);

      category.percentage = (category.used / category.limit) * 100;

      return acc;
    },
    [] as { name: string; used: number; limit: number; percentage: number }[]
  );

  //   console.log("categoryTotals", categoryTotals);
  if (error) {
    console.log(error);
  }
  console.log(categoryTotals);

  return categoryTotals;
};

export const fetchTotalRelief = async () => {
  const supabase = await createClient();
  const { data: userInfo, error: userInfoError } =
    await supabase.auth.getUser();

  if (userInfoError || !userInfo?.user) {
    console.log("Invalid user");
    redirect("/login");
  }

  const { data: taxUtils, error } = await supabase
    .from("receipts")
    .select(`amount`)
    .eq("user_id", userInfo.user.id);

  if (error) {
    console.log(error);
  }

  const totalRelief = taxUtils?.reduce((acc, receipt) => {
    const amount = receipt.amount;

    return acc + amount;
  }, 0);

  return totalRelief;
};

export const getPresignedUrl = async (receiptPath: string) => {
  console.log("server getPresignedUrl");

  const supabase = await createClient();

  console.log(receiptPath);

  const { data, error } = await supabase.storage
    .from("receipts")
    .createSignedUrl(receiptPath, 60);

  console.log(data);

  return data?.signedUrl;
};
