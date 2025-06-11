export default class Trie{
    constructor(){
        this.isEnd=false
        this.children=new Map()
    }

    insert(word){
        let current=this
        for(let i=0;i<word.length;i++)
        {
            if (!current.children.has(word[i]))
                current.children.set(word[i],new Trie())
            current=current.children.get(word[i])
        }
        current.isEnd=true;
    }

    generate_list(word,list,current){
        if (current.isEnd)
            list.push(word)
        for(const [key,value] of current.children.entries()){
            this.generate_list(word+key,list,value)
        }
    }

    get_list_of_matching_words(word){
        let current=this
        for(let i=0;i<word.length;i++)
        {
            if(!current.children.has(word[i])) return []
            current=current.children.get(word[i])
        }
        const list=[]
        this.generate_list(word,list,current)
        return list
    }
    
}


// const trie = new Trie();
// trie.insert("apple");
// trie.insert("app");
// console.log(trie.get_list_of_matching_words("apo"));
