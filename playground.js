// function calc(callback) {
//     let a = 'hello world';
//     callback(a);
// }

// calc((e) => {
//     console.log(e);
// });

function test(parentArray, callback) {
    parentArray.forEach((element) => {
        callback(element);
    });
}

const array = [1, 2, 3, 4, 5, 6, 7];

test(array, (number) => console.log(number));
