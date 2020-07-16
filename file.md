# Mục lục

0. Ôn lại hoạt động của browser (rendering engine)
1. Stack reconciler ( for react version < 16.1 )
2. Fiber reconciliation ( for react version > 16.0 )
3. Scheduler
4. Concurrent Mode( Install package )
5. Chia Component cơ bản, Các thư viện hỗ trợ quản lý state tốt, 2 ví dụ trong cải thiện perfomace theo cơ chế diffing children

# Hoạt động của browser

![anh](images/2.1.png)

![anh](images/2.2.png)

## Giai đoạn parsing

Javascript objects. Kế thừa node class
Sau khi contruct DOM tree xong, tiếp tục đọc tất cả CSS từ external ,embedded, inline contruct CSSOM.
Đơn vị cơ bản nhất trên cây: underlying DOM tag elements.

![anh](images/3.1.png)

## Giai đoạn tạo render tree

Chỉ chứa những element được view trên màn hình.
![anh](images/4.png)

## Giai đoạn layout và panting

Layout: Tạo layout cho mỗi node trên render tree
Chứa kích thước của mỗi node trong đơn vị pixel và vị trí nó sẽ được print lên màn hình.
Quá trình này gọi là reflow.
Ngoài ra diễn ra reflow khi ta thực hiện các action sau:

- Scroll
- Resize window
- Manipulate DOM elemnts

Painting:
Từng node giao tiếp với giao diện hệ điều hành
=> Quá trình này gọi là repaint
