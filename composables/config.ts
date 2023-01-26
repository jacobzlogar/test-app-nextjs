export class Config {
  url = (): string => {
    return "af35cf077978d416c8ce5a31bf7cdd99-1754053019.us-east-1.elb.amazonaws.com"
  };
  nest_api_url = (): string => {
    return `${process.env.NEXT_PUBLIC_NEST_PORT}`;
  };
  soketi_port = (): string => {
    return process.env.NEXT_PUBLIC_MINIKUBE_SOKETI_PORT;
  };
}
