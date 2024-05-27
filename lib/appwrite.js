import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.yeldynov.stepsure",
  projectId: "664f117f001fc0a21ea1",
  databaseId: "664f12d900173e0e3ac4",
  userCollectionId: "664f12ef0006a60b569a",
  sessionCollectionId: "664f13130020e5fb00b5",
  storageId: "664f16aa002736fc2a49",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      },
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)],
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
};

export const createRecord = async (record) => {
  try {
    const newRecord = await databases.createDocument(
      config.databaseId,
      config.sessionCollectionId,
      ID.unique(),
      {
        duration: record.duration,
        date: record.date,
        feedback: record.feedback || null,
        stars: record.rating,
        photo: record.photo || null,
        creator: record.userId,
      },
    );
    return newRecord;
  } catch (error) {
    throw new Error(error);
  }
};

export const getUserRecords = async (userId) => {
  try {
    const records = await databases.listDocuments(
      config.databaseId,
      config.sessionCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")],
    );
    return records.documents;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSingleRecord = async (recordId) => {
  try {
    const record = await databases.getDocument(
      config.databaseId,
      config.sessionCollectionId,
      recordId,
    );
    return record;
  } catch (error) {
    throw new Error(error);
  }
};
