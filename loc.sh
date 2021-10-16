# loc.sh
# USAGE: loc.sh [--log] <username>
# Counts a user's contributions to this project and optionally logs all
# the files they have edited.

# Check that the passed arguments are valid
if [[ $# -lt 1 ]] \
    || [[ $1 = "--log" ]] && [[ $# -lt 2 ]] \
    || [[ $# -gt 2 ]]
then
    echo "USAGE: loc.sh [--log] <username>"
    exit 1
fi

# Check whether the user wants to log all edited files
if [[ $1 = "--log" ]]
then
    echo "Calculating files edited by $2..."
    echo "Results will be of the form: [Lines Added] [Lines Removed] [File Edited]"
    # If logging, we do not use "awk" to sum
    # Filter out various paths, keywords/files, and extensions which are not
    # considered source code.
    git log --author=$2 --pretty=tformat: --numstat \
        | grep -v 'www' | grep -v 'assets' | grep -v 'meetings' | grep -v 'plans' | grep -v 'reports' \
        | grep -v 'package' | grep -v 'GROUP-INFO' | grep -v 'inspection' \
        | grep -v '.*\.md' | grep -v '.*\.png' | grep -v '.*\.pdf'
else
    echo "Calculating contribution sums of $1..."
    echo "Results will be of the form: [Lines Added] [Lines Removed]"
    echo "[$1]"
    # Calculate the sum of lines added and removed by the user
    # Filter out various paths, keywords/files, and extensions which are not
    # considered source code.
    git log --author=$1 --pretty=tformat: --numstat \
        | grep -v 'www' | grep -v 'assets' | grep -v 'meetings' | grep -v 'plans' | grep -v 'reports' \
        | grep -v 'package' | grep -v 'GROUP-INFO' | grep -v 'inspection' \
        | grep -v '.*\.md' | grep -v '.*\.png' | grep -v '.*\.pdf' \
        | awk '{ add+=$1; remove+=$2 } END { print add, remove }'
    echo "[Total for Repository]"
    # Calculate the sum of lines added and removed by all users
    # Filter out various paths, keywords/files, and extensions which are not
    # considered source code.
    git log --pretty=tformat: --numstat \
        | grep -v 'www' | grep -v 'assets' | grep -v 'meetings' | grep -v 'plans' | grep -v 'reports' \
        | grep -v 'package' | grep -v 'GROUP-INFO' | grep -v 'inspection' \
        | grep -v '.*\.md' | grep -v '.*\.png' | grep -v '.*\.pdf' \
        | awk '{ add+=$1; remove+=$2 } END { print add, remove }'
fi