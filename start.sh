#!/bin/sh
# Add custom host entry
echo "172.31.29.120 d1irpg7po1rqdm.cloudfront.net" >> /etc/hosts

# Run your app
exec npm start