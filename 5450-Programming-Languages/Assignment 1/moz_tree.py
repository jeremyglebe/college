# Motzkin tree of size n
def mot (n) :
  if n==0 : 
    yield 'leaf'
  else :
    for m in mot(n-1) :
      yield ('unary',m)
    for k in range(0,n-1) :    
      for l in mot(k) :
        for r in mot(n-2-k) :        
          yield ('binary',l,r)

def test(m) :
  for n in range(m) :
    list(map(print,list(mot(n))))

# print( list( mot(5) ) )
test(5)