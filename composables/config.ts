export class Config {
  url = (): string => {
    return `${process.env.NEXT_PUBLIC_CLUSTER_IP}`;
  };
  nest_api_url = (): string => {
    return `${process.env.NEXT_PUBLIC_NEST_PORT}`;
  };
  soketi_port = (): string => {
    return process.env.NEXT_PUBLIC_MINIKUBE_SOKETI_PORT;
  };
}
