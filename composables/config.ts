export class Config {
  url = (): string => {
    return "a6936de316b504756b04e89985915046-1065067211.us-east-1.elb.amazonaws.com"
  };
  nest_api_url = (): string => {
    return `${process.env.NEXT_PUBLIC_NEST_PORT}`;
  };
  soketi_port = (): string => {
    return process.env.NEXT_PUBLIC_MINIKUBE_SOKETI_PORT;
  };
}
