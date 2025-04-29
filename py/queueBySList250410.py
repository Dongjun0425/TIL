class LinkedQueue :
    class Node :
        def __init__(self, item, link) :
            self.item = item
            self.next = link
    def __init__(self) :
        print("난 꿈이 있어요, 그 꿈을 믿어요")
        self.front = None
        self.rear = None
        self.size = 0
        
    def isEmtpy(self) :
        return self.size ==0

    def add(self,item) :
        newnode = self.Node(item , None)
        if self.isEmtpy() :
            self.front = newnode
        else :
            self.rear.next = newnode

        self.rear = newnode
        self.size += 1

    def dispq(self) :
         p = self.front
         print("front =>",end="")
         while p:
             if p.next != None :
                 print("{!s:<7}".format(p.item),"=>",end="") 
                 #!s 는 string <는 왼쪽정렬 7은 일곱자리설정
             else :
                 print(p.item, end='')

             p = p.next
         print(" :rear")
    def delete(self) :
        if self.isEmtpy() :
            raise EmptyError("queue가 텅 비어있습니다.")
        else :
            fitem = self.front.item
            oldfront = self.front
            self.front = self.front.next
            del oldfront
            self.size -= 1
            if self.isEmtpy() :
                self.rear = None
        return fitem
class EmtpyEorror(Exception) :
    pass

if __name__ =="__main__" :
    q = LinkedQueue()
    q.add("apple")
    q.add("orange")
    q.add("cherry")
    q.add("pear")
    q.add("peach")
    print("사과, 오렌지, 체리, 배 삽입후=",end="")
    q.dispq()

    delfruit = q.delete()
    print("사과 삭제후 delfruit=",delfruit)
    q.dispq()

    print("front가 가리키는 orange노드 삭제 후 queue=")
    delfruit = q.delete()
    print("오렌지 삭제후 delfruit=" , delfruit)
    q.dispq()
