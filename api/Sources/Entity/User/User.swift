import Foundation

public struct User: Hashable, Codable, Identifiable {
    
    public var id: ID
    
    public var name: String
    
    public init(id: ID, name: String) {
        self.id = id
        self.name = name
    }
}

extension User {
    public struct ID: Hashable, Codable {
        public let value: UUID
        public init(_ value: UUID) {
            self.value = value
        }
    }
}

extension User: Comparable {
    public static func < (lhs: User, rhs: User) -> Bool {
        lhs.name < rhs.name
    }
}