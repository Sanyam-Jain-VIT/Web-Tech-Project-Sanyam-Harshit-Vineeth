var i=0; function image()
{
var d=document.getElementsByTagName("img")[0];
var images=["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTutH871H9ICSl6Id7lvm7zx5A1gq4n2DSs5A&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkw7peH4C1RcO21WjJgJn0JTG8TtZJj06Q_w&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jHltLPjW8hwao16odVDTP-weTBMHrSEb3g&usqp=CAU","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxd0UxYsgTAEybdaOUS_32_GdQd0dji7rXsfg1SyJDpFsxScW8lCsvdcLQ1B2GswBRKWM&usqp=CAU"];
d.setAttribute("src",images[i]);
d.setAttribute("alt",images[i].split("\.")[0]);
i++;
if(i>3)i=0;
setTimeout(image,1000);
}
image();
