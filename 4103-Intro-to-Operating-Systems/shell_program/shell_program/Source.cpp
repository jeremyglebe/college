/* Jeremy Glebe
 * MS-SHELL
 * Description: A really hard program I don't like.
*/
#include<windows.h>
#include<iostream>
//Windows' default MAX_PATH. Shouldn't have a command longer than this.
#define MAX_PATH 260
int main() {
	wchar_t command[MAX_PATH];
	while (command[0] != '%') {
		//Prompt the user for a command
		std::cout << "MS-SHELL> ";
		std::wcin >> command;
		//Adds two integers if command is of form "+ int int"
		if (command[0] == '+') {
			int n1, n2;
			std::cin >> n1 >> n2;
			std::cout << n1 + n2 << std::endl;
		}
		//Subtracts two integers if command is of form "- int int"
		else if (command[0] == '-') {
			int n1, n2;
			std::cin >> n1 >> n2;
			std::cout << n1 - n2 << std::endl;
		}
		//Start a process if a path was typed
		else {
			STARTUPINFO si;
			PROCESS_INFORMATION pi;
			ZeroMemory(&si, sizeof(si));
			ZeroMemory(&pi, sizeof(pi));
			if (!CreateProcess(
				NULL,
				(LPTSTR)command,
				NULL,
				NULL,
				FALSE,
				0,
				NULL,
				NULL,
				&si,
				&pi)
				) {
				std::cout << "Failed to create process from path: \""
					<< command << "\"" << std::endl;
			}
			CloseHandle(pi.hProcess);
			CloseHandle(pi.hThread);
		}
	}
	return 0;
}