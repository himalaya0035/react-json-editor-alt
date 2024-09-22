class TrieNode {
  children: Record<string, TrieNode>;
  regexPatterns: RegExp[];
  paths: string[];

  constructor() {
    this.children = {};
    this.regexPatterns = [];
    this.paths = [];
  }
}

export class RegexTrie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode();
  }

  // Insert paths into the trie with regex patterns
  insert(path: string, regex: RegExp): void {
    let node: TrieNode = this.root;
    const parts: string[] = path.split(".");

    for (const part of parts) {
      if (!node.children[part]) {
        node.children[part] = new TrieNode();
      }
      node = node.children[part];
    }

    node.regexPatterns.push(regex);
    node.paths.push(path);
  }

  // Function to traverse trie and gather potential regex patterns for matching
  findMatchingRegex(newPath: string): {
    regexPatterns: RegExp[];
    paths: string[];
  } {
    const queue: [TrieNode, number][] = [[this.root, 0]]; // BFS queue with root node and current part index
    const parts: string[] = newPath.split(".");
    const matchingPatterns = {
      regexPatterns: [] as RegExp[],
      paths: [] as string[],
    };

    while (queue.length > 0) {
      const [node, index] = queue.shift()!;

      // If we've matched all parts of the path, gather regex patterns
      if (index === parts.length) {
        matchingPatterns.regexPatterns.push(...node.regexPatterns);
        matchingPatterns.paths.push(...node.paths);
        continue;
      }

      // Add exact matches or wildcard handling
      const part: string = parts[index];
      for (const key in node.children) {
        if (key === "[]" || key === part) {
          queue.push([node.children[key], index + 1]);
        }
      }
    }
    return matchingPatterns;
  }
}