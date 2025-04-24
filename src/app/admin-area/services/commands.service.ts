import { Injectable } from '@angular/core';
import { CommandMeta } from '../../shared/models/command.type';

@Injectable({
  providedIn: 'root'
})
export class CommandService {
  private readonly commands = new Map<string, CommandMeta>();

  public registerCommand(key: string, command: CommandMeta): void {
    if (!this.commands.has(key)) {
      this.commands.set(key, command);
    }
  }

  public getCommandsByFamily(family: string): CommandMeta[] {
    const commandsArray: CommandMeta[] = [];

    this.commands.forEach(command => {
      if (command.family === family) {
        commandsArray.push({ ...command });
      }
    });

    return commandsArray;
  }
}

