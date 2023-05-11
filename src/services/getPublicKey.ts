import { api } from "./api";

interface GetPublicKeyResponse {
  publicKey: string;
}

async function getPublicKey() {
  const { data } = await api.get<GetPublicKeyResponse>(
    "/notifications/push/public_key"
  );

  return data;
}

export default getPublicKey;
