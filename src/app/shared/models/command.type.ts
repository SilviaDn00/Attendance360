export type CommandMeta = {
    icon: string;
    family: string;
    action: (...args: any[]) => void;
  };
  
  