import sys
import os

# Get the arguments (repo name and repo url)
repo_url = sys.argv[1]
subfolder = sys.argv[2]

# May include a third argument that specifies the remote repos main branch name
if len(sys.argv) > 3:
    main_branch = sys.argv[3]
else:
    main_branch = "master"

# Get the repo name from the url
repo_name = repo_url.split("/")[-1].split(".")[0]

# Get the current directory
current_dir = os.getcwd()

# Clone the repo
os.system(f"git clone {repo_url}")

# Change the directory to the repo
os.chdir(f"{current_dir}/{repo_name}")

# Create the folder
os.system(f"mkdir {subfolder}")

# Move contents including hidden files to the folder
os.system(f"mv * {subfolder}")
os.system(f"mv .* {subfolder}")

# Move the .git folder back to the repo root instead of the folder
os.system(f"mv {subfolder}/.git .")

# Commit the changes and push them
os.system(f"git add .")
os.system(f"git commit -m \"Add {subfolder} folder\"")
os.system(f"git push origin {main_branch}")

# Change the directory back to the current directory
os.chdir(f"{current_dir}")

# Add a remote to the repo
os.system(f"git remote add {subfolder} {repo_url}")

# Pull the history from the repo
os.system(f"git pull {subfolder} {main_branch} --allow-unrelated-histories")

# Push the history to the repo
os.system(f"git push origin master")

# Remove the cloned repo
os.system(f"rm -rf ./{repo_name}")