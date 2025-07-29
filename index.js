const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyparser.json());
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        if (!Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "data must be an array"
            })
        }
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const characters = [];
        let sum = 0;
        let chars = '';
        for (const i of data) {
            if (/^[a-zA-z]+$/.test(i)) {
                alphabets.push(i.toUpperCase());
                chars += i;
            } 
            else if (!isNaN(i) && !isNaN(parseFloat(i))) {
                const n = Number(i);
                if (i % 2 === 0) {
                    even_numbers.push(String(n));
                } else {
                    odd_numbers.push(String(n));
                }
                sum += n;
            } else{
                characters.push(i);
            }
        }
        let reverse = chars.split("").reverse().join('');
        let ans = '';
        for (let i = 0; i < reverse.length; i++) {
            if (i % 2 === 0) {
                ans += reverse[i].toUpperCase();
            } else {
                ans += reverse[i].toLowerCase();
            }
        }
        const response = {
            is_success: true,
            user_id: "john_doe_17091999",
            email: "john@xyz.com",
            roll_number: "ABCD123",
            odd_numbers,
            even_numbers,
            alphabets,
            characters,
            sum: String(sum),
            ans
        };
        res.status(200).json(response);
    } catch {
        res.status(500).json({
            is_success: false,
            error: "data entered may be wrong"
        })
    }
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})