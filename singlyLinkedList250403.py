class SList : 
    class Node :
        def __init__(self,item,link) :
            self.item = item
            self.next = link

    def __init__(self) :
        print("난 꿈이 있어요. 그 꿈을 믿어요")
        self.head = None
        self.size = 0

    def isEmpty(self) :
        return self.size == 0

    def insert_front(self, item) :
        if self.isEmpty() :
            self.head = self.Node(item,None)
        else :
            self.head = self.Node(item,self.head)
        self.size += 1
    
    def insert_after(self,item,p) :
        p.next = self.Node(item,p.next)
        self.size += 1

    def search(self, target) :
        p = self.head
        for k in range(self.size) :
            if target == p.item :
                return k
            p = p.next

    def delete_after(self,p) :
        if self.isEmpty() :
            print("리스트가 비어있습니다. (*삭제불가)")
            return None
        else :
            t = p.next
            p.next = t.next
            del t
            self.size -= 1

    def delete_front(self) :
        if self.isEmpty():
            print("리스트가 비어있습니다. (*삭제불가)")
            return None
        else :
            t = self.head
            self.head = self.head.next
            del t
            self.size -= 1

    def insert_index(self, index, item):
        if index <0 or index > self.size :
            print("잘못된 인덱스 번호입니다.")
            return
        
        if index ==0 :
            self.insert_front(item)
        else :
             p = self.head
             for k in range(index-1) :
                 p = p.next
             self.insert_after(item,p)

        self.size += 1

    def delete_index(self, index):
        if index <0 or index > self.size :
            print("잘못된 인덱스 번호입니다.")
            return
         
        if index ==0 :
            self.delete_front()
        else :
            p = self.head
            for k in range(index -1) :
                p = p.next
            self.delete_after(p)

        self.size -= 1

    def delete_final(self):
        if self.isEmpty():
            print("리스트가 비어있습니다.")
            return
        
        if self.size == 1 :
            self.delete_front()
        else:
            p = self.head
            while p.next and p.next.next :
                p = p.next
            self.delete_after(p)

        self.size -= 1

    def printList(self) :
        p = self.head
        while p:
            if p.next is not None :
                print(p.item , "=>", end="")
            else :
                print(p.item)
            p = p.next


def globalFunction() :
    pass

if __name__ == "__main__" :
    s = SList()
    s.insert_front("apple")
    s.insert_front("orange")
    s.printList()
    s.insert_after("cherry",s.head.next)
    s.printList()
    s.insert_front("pear")
    s.insert_front("strawberry")
    s.insert_front("grape")
    s.insert_front("melon")
    s.insert_front("banana") 
    s.printList()
    print("cherry는 %d번째 노드에 있다." %
          (s.search("cherry")+1))
    s.delete_after(s.head)
    s.printList()
    print("첫번째 노드 삭제후 \t\t")
    s.delete_front()
    s.printList()
    print("지금")
    s.insert_index(2,"melon")
    s.delete_index(3)
    s.delete_final()
    s.printList()

    
    